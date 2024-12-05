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
        const timeToTwentyPercent = startingAmount * 0.8 / totalWeeklyExpenses;
        const timeToZero = startingAmount / totalWeeklyExpenses;

        const today = new Date();

        halfRemainingOutput.textContent = formatDuration(timeToHalf, today);
        twentyPercentOutput.textContent = formatDuration(timeToTwentyPercent, today);
        zeroBalanceOutput.textContent = formatDuration(timeToZero, today);
    }

    function formatDuration(weeks, startDate) {
        const totalDays = Math.round(weeks * 7);
        const endDate = new Date(startDate.getTime() + totalDays * 24 * 60 * 60 * 1000);

        if (totalDays < 7) {
            // Less than a week
            return `${totalDays} Day${totalDays !== 1 ? "s" : ""} - ${formatDate(endDate)}`;
        } else if (totalDays < 35) {
            // Between 1 week and 5 weeks
            const fullWeeks = Math.floor(totalDays / 7);
            const remainingDays = totalDays % 7;
            return `${fullWeeks} Week${fullWeeks !== 1 ? "s" : ""}, ${remainingDays} Day${remainingDays !== 1 ? "s" : ""} - ${formatDate(endDate)}`;
        } else if (totalDays < 365) {
            // Less than a year (more than 5 weeks)
            const fullMonths = Math.floor(totalDays / 30.44); // Average days in a month
            const remainingWeeks = Math.floor((totalDays % 30.44) / 7);
            const remainingDays = Math.round((totalDays % 30.44) % 7);
            return `${fullMonths} Month${fullMonths !== 1 ? "s" : ""}, ${remainingWeeks} Week${remainingWeeks !== 1 ? "s" : ""}, ${remainingDays} Day${remainingDays !== 1 ? "s" : ""} - ${formatDate(endDate)}`;
        } else {
            // More than a year
            const fullYears = Math.floor(totalDays / 365);
            const remainingMonths = Math.floor((totalDays % 365) / 30.44);
            const remainingWeeks = Math.floor(((totalDays % 365) % 30.44) / 7);
            const remainingDays = Math.round(((totalDays % 365) % 30.44) % 7);
            return `${fullYears} Year${fullYears !== 1 ? "s" : ""}, ${remainingMonths} Month${remainingMonths !== 1 ? "s" : ""}, ${remainingWeeks} Week${remainingWeeks !== 1 ? "s" : ""}, ${remainingDays} Day${remainingDays !== 1 ? "s" : ""} - ${formatDate(endDate)}`;
        }
    }

    function formatDate(date) {
        const options = { day: "numeric", month: "short", year: "numeric" };
        return date.toLocaleDateString("en-GB", options);
    }

    // Event listeners for real-time calculations
    startingAmountInput.addEventListener("input", calculateDurations);
    weeklyExpensesInput.addEventListener("input", calculateDurations);
    monthlyExpensesInput.addEventListener("input", calculateDurations);
    dailyExpensesInput.addEventListener("input", calculateDurations);
});
