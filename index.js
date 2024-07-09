// Product A info
const productA = {
    emoji: "⭐",
    revenue: 200,
    commission: 50
}
// Product B info
const productB = {
    emoji: "🔥",
    revenue: 300,
    commission: 75
}
const productABtn = document.getElementById("productA");
const productBBtn = document.getElementById("productB");
const resetBtn = document.getElementById("reset");
const salesEl = document.getElementById("sales");
const salesCntEl = document.getElementById("sales-cnt");
const achievementsEl = document.getElementById("achievements");
const achievementsCntEl = document.getElementById("achievements-cnt");
const totalRevenueEl = document.getElementById("total-revenue");
const totalCommissionEl = document.getElementById("total-commission");
const salesFromLocalStorage = JSON.parse( localStorage.getItem("sales"));
const achievementsFromLocalStorage = JSON.parse(localStorage.getItem('achievements'))
const revenueFromLocalStorage = JSON.parse(localStorage.getItem("revenue"));
const commissionFromLocalStorage = JSON.parse(localStorage.getItem("commission"));
const root = document.querySelector(':root');
const modeEl = document.getElementById("mode");

let sales = [];
let achievements = [];
let totalRevenue = 0;
let totalCommission = 0;
let hasReceivedRevBonus = false;

/* If this exists then the others must exist too */
if (salesFromLocalStorage) {
    sales = salesFromLocalStorage;
    achievements = achievementsFromLocalStorage;
    totalRevenue = revenueFromLocalStorage;
    totalCommission = commissionFromLocalStorage;

    displayUpdatedData();
}

productABtn.addEventListener("click", function() {
    addSale(productA);
})

productBBtn.addEventListener("click", function() {
    addSale(productB);
})

resetBtn.addEventListener("click", function() {
    localStorage.clear();
    sales = [];
    achievements = [];
    totalRevenue = 0;
    totalCommission = 0;

    displayUpdatedData();
})

modeEl.addEventListener("click", function() {

    let isDarkMode = modeEl.checked;

    if (isDarkMode) {
        root.style.setProperty('--container-background', '#201A23');
        root.style.setProperty('--element-background', '#44354A');
        root.style.setProperty('--text-color', '#FFFFFF');
        root.style.setProperty('--button-color', '#9E4770');
        root.style.setProperty('--slider-color', '#f5cac3');
        root.style.setProperty('--slider-checked-color', '#f7ede2');
    } else {
        root.style.setProperty('--container-background', '#f7ede2');
        root.style.setProperty('--element-background', '#f5cac3');
        root.style.setProperty('--text-color', '#84a59d');
        root.style.setProperty('--button-color', '#84a59d');
        root.style.setProperty('--slider-color', '#201A23');
        root.style.setProperty('--slider-checked-color', '#6a5175');
    }
})

function addSale(product) {
    sales.push(product.emoji);

    totalRevenue += product.revenue;
    totalCommission += product.commission;

    calculateAchievement();

    localStorage.setItem("sales", JSON.stringify(sales));
    localStorage.setItem("achievements", JSON.stringify(achievements));
    localStorage.setItem("revenue", totalRevenue);
    localStorage.setItem("commission", totalCommission);

    displayUpdatedData();
}

function calculateAchievement() {
    if (sales.length === 1) {
        achievements.push("🔔");
    } else if (totalRevenue > 2500 && !hasReceivedRevBonus) {
        achievements.push("💰");
        hasReceivedRevBonus = true;
    } else if (sales.length === 15) {
        achievements.push("🏆");
    }
}

function displayUpdatedData() {
  salesEl.textContent = sales.join("");
  salesCntEl.textContent = sales.length;
  achievementsEl.textContent = achievements.join("");
  achievementsCntEl.textContent = achievements.length;
  totalRevenueEl.textContent = `$ ${totalRevenue}`;
  totalCommissionEl.textContent = `$ ${totalCommission}`;
}
