/**
 * Element Selectors
 */
const canvas = document.getElementById('spinner_canvas');
const spinButton = document.getElementById('spin-button');
const ctx = canvas.getContext('2d');
const winContainer = document.getElementById('win-container');
const winCouponContainer = document.getElementById('win-container-coupons');
const winNumber = document.getElementById('special-deals-number');
const couponContainer = document.getElementById('coupons-container');

/**
 * Constant values
 */
const SIZE = 228;
const radius = SIZE / 2;
const SLICE_STROKE = 4;
const WORD_DISTANCE = 15;
const EASING_FACTOR = 0.05;
const ROTATION_THRESHOLD = 0.02;
const COLOR_WHITE = '#FFFFFF';
const COLOR_BLACK = '#000000';
const COLOR_YELLOW = '#FBBF24';
const API_URL =
    'https://gist.githubusercontent.com/ameer-wajid-ali/1f29ebee4295cede36f8d74b45e576df/raw/122966c9a123861249f173911d8d93a76dc06d7a/ ';

/**
 * Data arrays
 */
let couponData = [];
let selectedCoupons = [];
const colors = ['#06B6D4', '#F4436C', '#7C3AED', '#FBBF24'];
let sliceAngle = (2 * Math.PI) / selectedCoupons.length;
let rotation = 0;
let isSpinning = false;

/**
 * fetches Data from api.
 */
const fetchData = async () => {
    try {
        const response = await fetch(API_URL);

        if (!response.ok) {
            throw new Error(`Response status: ${response.status}`);
        }
        couponData = await response.json();
    } catch (error) {
        console.error(error.message);
    }
};

/**
 * copies the coupon code.
 * @param {ClickEvent} event -The click event on the copy button.
 */
const copyCode = (event) => {
    if (event.target.parentElement.classList.contains('copy-button')) {
        const code = event.target.parentElement.id;
        navigator.clipboard.writeText(code);
        const originalSrc = event.target.src;
        event.target.src = './assets/images/special_deals/tick.svg';

        setTimeout(() => {
            event.target.src = originalSrc;
        }, 1000);
    }
};

/**
 * Randomly selects 4 random coupons from the total coupons.
 * @param {Array} data - Collection of all the coupons.
 */
const selectRandomCoupons = (data) => {
    let shuffled = [...data];
    const storedCoupons = JSON.parse(localStorage.getItem('wonOffers'));
    shuffled = storedCoupons
        ? shuffled.filter(
              (c) => !storedCoupons.find((u) => u.label === c.label),
          )
        : shuffled;

    for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled.slice(0, 4);
};

/**
 * Draws the spinning wheel.
 */
const drawWheel = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.save();
    ctx.translate(radius, radius);
    ctx.rotate(rotation);
    drawSlices();
    ctx.restore();
};

/**
 * Draws the slices in the spinner.
 */
const drawSlices = () => {
    selectedCoupons.forEach((coupon, index) => {
        const startAngle = index * sliceAngle - Math.PI / 2;
        const endAngle = startAngle + sliceAngle;
        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.arc(0, 0, radius, startAngle, endAngle);
        ctx.closePath();
        ctx.fillStyle = colors[index];
        ctx.fill();
        ctx.lineWidth = SLICE_STROKE;
        ctx.strokeStyle = COLOR_WHITE;
        ctx.stroke();
        drawLabel(coupon.label, startAngle + sliceAngle / 2, colors[index]);
    });
};

/**
 * Draws text inside the slices.
 * @param {text} event -Text to be written inside slide.
 * @param {number} angle -Tangle at which text needs to be drawn.
 * @param {color} color -color of slide.
 */
const drawLabel = (text, angle, color) => {
    ctx.save();
    ctx.rotate(angle);
    ctx.translate(radius * 0.5, 0);
    ctx.rotate(Math.PI / 2);
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.font = 'bold 12px Inter';
    ctx.fillStyle = color === COLOR_YELLOW ? COLOR_BLACK : COLOR_WHITE;
    const words = text.split(' ');
    let lineHeight = WORD_DISTANCE;
    let line = '';
    const lines = [];

    words.forEach((word) => {
        const tempLine = line + word + ' ';

        if (ctx.measureText(tempLine).width > 70) {
            lines.push(line);
            line = word + ' ';
        } else {
            line = tempLine;
        }
    });

    if (line.trim()) {
        lines.push(line.trim());
    }

    const startY = (-(lines.length - 1) * lineHeight) / 2;

    lines.forEach((line, index) => {
        ctx.fillText(line, 0, startY + index * lineHeight);
    });

    ctx.restore();
};

/**
 * starts animation of the wheel and manages the spinning state.
 * @param {number} targetRotation -Target angle at which spinner needs to be stopped.
 * @param {number} winner-Index of winner.
 */
const spinWheel = (targetRotation, winner) => {
    if (isSpinning) {
        return;
    }

    isSpinning = true;
    spinButton.disabled = true;

    requestAnimationFrame(() => {
        animate(targetRotation, winner);
    });
};

/**
 * animates the spinning motion.
 * @param {number} targetRotation -Target angle at which spinner needs to be stopped.
 * @param {number} winner-Index of winner.
 */
const animate = (targetRotation, winner) => {
    const remainingRotation = targetRotation - rotation;

    if (remainingRotation <= ROTATION_THRESHOLD) {
        rotation = targetRotation;
        drawWheel();
        isSpinning = false;
        spinButton.disabled = false;
        showCouponWon(selectedCoupons[winner]);
        selectedCoupons = selectRandomCoupons(couponData);
        winNumber.innerText = JSON.parse(localStorage.getItem('wonOffers'))
            ? JSON.parse(localStorage.getItem('wonOffers')).length
            : 0;
        return;
    }

    rotation += remainingRotation * EASING_FACTOR;
    drawWheel();

    requestAnimationFrame(() => {
        animate(targetRotation, winner);
    });
};

/**
 * initialise the content for rendering the wheel.
 */
const initialise = () => {
    winCouponContainer.innerHTML = '';
    winContainer.classList.remove('special-deals__win--show');
    winNumber.innerText = JSON.parse(localStorage.getItem('wonOffers'))
        ? JSON.parse(localStorage.getItem('wonOffers')).length
        : 0;
    selectedCoupons = selectRandomCoupons(couponData);
    sliceAngle = (2 * Math.PI) / selectedCoupons.length;
    drawWheel();
};

/**
 * Finds validity of coupon.
 * @param {object} coupon - coupon whose validity needs to be checked.
 */
const findValidity = (coupon) => {
    const wonCoupons = JSON.parse(localStorage.getItem('wonOffers'));

    if (wonCoupons) {
        const currentCoupon = wonCoupons.find((u) => u.label === coupon.label);
        const storeDate = currentCoupon.Date;
        const timePassed = Math.floor(
            (Date.now() - storeDate) / (24 * 60 * 60 * 1000),
        );
        const validTill = coupon.validFor ? coupon.validFor : 7;
        const couponValidity = validTill - timePassed;
        return couponValidity;
    }
};

/**
 * renders the coupon.
 * @param {object} coupon - coupon which needs to be rendered.
 */
const renderCoupon = (coupon) => {
    const couponContainer = document.createElement('div');
    const couponLeft = document.createElement('div');
    const couponRight = document.createElement('div');
    const couponLabel = document.createElement('h2');
    const couponExpire = document.createElement('p');
    const couponCode = document.createElement('p');
    const copyButton = document.createElement('button');
    const copyIcon = document.createElement('img');
    copyIcon.src = '/assets/images/special_deals/copy.svg';
    copyIcon.alt = 'copy icon';
    copyIcon.className = 'copy-icon';
    copyButton.type = 'button';
    copyButton.className = 'button button--sm copy-button';
    copyButton.id = coupon.promoCode;
    copyButton.ariaLabel = 'Copy coupon code';
    copyButton.append(copyIcon);
    couponCode.className = 'coupon__code body3';
    couponCode.innerText = coupon.promoCode;
    couponRight.className = 'coupon__right';
    couponRight.append(couponCode, copyButton);
    couponExpire.className = 'coupon__expires body3';
    couponExpire.innerText = `Expires in ${findValidity(coupon)}d`;
    couponLabel.className = 'coupon__label body2';
    couponLabel.innerText = coupon.label;
    couponLeft.className = 'coupon__left';
    couponLeft.append(couponLabel, couponExpire);
    couponContainer.append(couponLeft, couponRight);

    if (findValidity(coupon) < 0) {
        couponContainer.className = 'coupon--disabled';
        copyButton.disabled = true;
    } else {
        couponContainer.className = 'coupon';
    }
    return couponContainer;
};

/**
 * renders the all the coupons won by user.
 */
const showAllCoupons = () => {
    const allCoupons = JSON.parse(localStorage.getItem('wonOffers'));
    couponContainer.innerHTML = '';

    allCoupons.sort((a, b) => {
        findValidity(a) - findValidity(b);
    });

    if (!allCoupons) {
        const para = document.createElement('p');
        para.className = 'heading2 coupons-container__heading';
        para.innerHTML = 'No Offer Won Yet!';
        couponContainer.append(para);
        return;
    }

    const couponChild = allCoupons.map((coupon) => {
        return renderCoupon(coupon);
    });

    couponContainer.append(...couponChild);
};

/**
 * Shows the coupon currently win by user.
 * @param {object} coupon - coupon which is win by user.
 */
const showCouponWon = (coupon) => {
    const wonCoupons = localStorage.getItem('wonOffers')
        ? JSON.parse(localStorage.getItem('wonOffers'))
        : [];
    const currentCoupon = { ...coupon, Date: Date.now() };
    const userCoupons = [...wonCoupons, currentCoupon];
    localStorage.setItem('wonOffers', JSON.stringify(userCoupons));
    const couponWon = renderCoupon(currentCoupon);
    winCouponContainer.innerHTML = '';
    winCouponContainer.append(couponWon);
    winContainer.classList.add('special-deals__win--show');
};

/**
 * Finds the random winner and rotates sets the targetAngle according to that .
 */
const rotateSpinner = () => {
    let winner = Math.floor(Math.random() * selectedCoupons.length);
    const extraSpins = Math.PI * 8;
    const currentAngle = rotation % (Math.PI * 2);
    winContainer.classList.remove('special-deals__win--show');
    winCouponContainer.innerHTML = '';
    const targetRotation =
        rotation +
        extraSpins -
        currentAngle -
        winner * sliceAngle -
        sliceAngle / 2;
    spinWheel(targetRotation, winner);
};

export { fetchData, rotateSpinner, initialise, showAllCoupons, copyCode };
