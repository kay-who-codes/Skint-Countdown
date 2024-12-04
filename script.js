document.addEventListener("DOMContentLoaded", () => {
    const startingAmountInput = document.getElementById("starting-amount");
    const weeklyExpensesInput = document.getElementById("weekly-expenses");
    const monthlyExpensesInput = document.getElementById("monthly-expenses");
    const dailyExpensesInput = document.getElementById("daily-expenses");
    const halfRemainingOutput = document.getElementById("half-remaining");
    const twentyPercentOutput = document.getElementById("twenty-percent-remaining");
    const zeroBalanceOutput = document.getElementById("zero-balance");

    function calculateDurations() {
        const startingAmount = parseFloat(startingAmountInput.value) || 0;
        const weeklyExpenses = parseFloat(weeklyExpensesInput.value) || 0;
        const monthlyExpenses = parseFloat(monthlyExpensesInput.value) || 0;
        const dailyExpenses = parseFloat(dailyExpensesInput.value) || 0;

        // Calculate total weekly expenses
        const weeklyEquivalentOfMonthly = monthlyExpenses / 4.345; // Average weeks in a month
        const weeklyEquivalentOfDaily = dailyExpenses * 7;
        const totalWeeklyExpenses = weeklyExpenses + weeklyEquivalentOfMonthly + weeklyEquivalentOfDaily;

        if (totalWeeklyExpenses <= 0 || startingAmount <= 0) {
            halfRemainingOutput.textContent = "-";
            twentyPercentOutput.textContent = "-";
            zeroBalanceOutput.textContent = "-";
            return;
        }

        // Calculate durations
        const timeToHalf = startingAmount / 2 / totalWeeklyExpenses;
        const timeToTwentyPercent = startingAmount * 0.2 / totalWeeklyExpenses;
        const timeToZero = startingAmount / totalWeeklyExpenses;

        halfRemainingOutput.textContent = formatDuration(timeToHalf);
        twentyPercentOutput.textContent = formatDuration(timeToTwentyPercent);
        zeroBalanceOutput.textContent = formatDuration(timeToZero);
    }

    function formatDuration(weeks) {
        const fullWeeks = Math.floor(weeks);
        const days = Math.round((weeks - fullWeeks) * 7);
        return `${fullWeeks} week${fullWeeks !== 1 ? "s" : ""}, ${days} day${days !== 1 ? "s" : ""}`;
    }

    // Event listeners for real-time calculations
    startingAmountInput.addEventListener("input", calculateDurations);
    weeklyExpensesInput.addEventListener("input", calculateDurations);
    monthlyExpensesInput.addEventListener("input", calculateDurations);
    dailyExpensesInput.addEventListener("input", calculateDurations);
});
