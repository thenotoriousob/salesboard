// Product A info
const productA = {
    name: "productA",
    emoji: "⭐",
    revenue: 200,
    commission: 50
}
// Product B info
const productB = {
    name: "productB",
    emoji: "🔥",
    revenue: 300,
    commission: 75
}
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
const products = [productA, productB];
const colorProperties = [
                          {
                            name: '--container-background',
                            darkTheme: '#201A23',
                            lightTheme: '#f7ede2'
                          },
                          {
                            name: '--element-background',
                            darkTheme: '#44354A',
                            lightTheme: '#f5cac3'
                          },
                          {
                            name: '--text-color',
                            darkTheme: '#FFFFFF',
                            lightTheme: '#72837f'
                          },
                          {
                            name: '--button-color',
                            darkTheme: '#9E4770',
                            lightTheme: '#84a59d'
                          },
                          {
                            name: '--slider-color',
                            darkTheme: '#f5cac3',
                            lightTheme: '#201A23'
                          },
                          {
                            name: '--slider-checked-color',
                            darkTheme: '#f7ede2',
                            lightTheme: '#6a5175'
                          }
];

let sales;
let achievements;
let totalRevenue;
let totalCommission;
let hasReceivedRevBonus;

resetPage();

/* If this exists then the others must exist too */
if (salesFromLocalStorage) {
    sales = salesFromLocalStorage;
    achievements = achievementsFromLocalStorage;
    totalRevenue = revenueFromLocalStorage;
    totalCommission = commissionFromLocalStorage;

    displayUpdatedData();
}

for (let i = 0; i < products.length; i++) {

  let productBtn = document.getElementById(products[i].name);

  productBtn.addEventListener("click", function() {
    addSale(products[i]);
  })

}

resetBtn.addEventListener("click", function() {
    resetPage();

    displayUpdatedData();
})

modeEl.addEventListener("click", function() {

    let isDarkMode = modeEl.checked;

    for (let i = 0; i < colorProperties.length; i++) {

        root.style.setProperty(colorProperties[i].name, isDarkMode ? colorProperties[i].darkTheme : colorProperties[i].lightTheme);

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

function resetPage() {
    sales = [];
    achievements = [];
    totalRevenue = 0;
    totalCommission = 0;
    hasReceivedRevBonus = false;
    localStorage.clear();
}
