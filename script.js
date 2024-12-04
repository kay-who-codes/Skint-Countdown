document.addEventListener("DOMContentLoaded", () => {
    const startingAmountInput = document.getElementById("starting-amount");
    const weeklyExpensesInput = document.getElementById("weekly-expenses");
    const halfRemainingOutput = document.getElementById("half-remaining");
    const twentyPercentOutput = document.getElementById("twenty-percent-remaining");
    const zeroBalanceOutput = document.getElementById("zero-balance");

    function calculateDurations() {
        const startingAmount = parseFloat(startingAmountInput.value);
        const weeklyExpenses = parseFloat(weeklyExpensesInput.value);

        if (!startingAmount || !weeklyExpenses || weeklyExpenses <= 0) {
            halfRemainingOutput.textContent = "-";
            twentyPercentOutput.textContent = "-";
            zeroBalanceOutput.textContent = "-";
            return;
        }

        const timeToHalf = startingAmount / 2 / weeklyExpenses;
        const timeToTwentyPercent = startingAmount * 0.8 / weeklyExpenses;
        const timeToZero = startingAmount / weeklyExpenses;

        halfRemainingOutput.textContent = formatDuration(timeToHalf);
        twentyPercentOutput.textContent = formatDuration(timeToTwentyPercent);
        zeroBalanceOutput.textContent = formatDuration(timeToZero);
    }

    function formatDuration(weeks) {
        const fullWeeks = Math.floor(weeks);
        const days = Math.round((weeks - fullWeeks) * 7);
        return `${fullWeeks} week${fullWeeks !== 1 ? "s" : ""}, ${days} day${days !== 1 ? "s" : ""}`;
    }

    startingAmountInput.addEventListener("input", calculateDurations);
    weeklyExpensesInput.addEventListener("input", calculateDurations);
});
