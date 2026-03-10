const fs = require("fs");

// ============================================================
// Function 1: getShiftDuration(startTime, endTime)
// startTime: (typeof string) formatted as hh:mm:ss am or hh:mm:ss pm
// endTime: (typeof string) formatted as hh:mm:ss am or hh:mm:ss pm
// Returns: string formatted as h:mm:ss
// ============================================================
function getShiftDuration(startTime, endTime) {
    // Parse start time
    const startMatch = startTime.match(/(\d{1,2}):(\d{2}):(\d{2})\s(am|pm)/i);
    let startHours = parseInt(startMatch[1]);
    const startMinutes = parseInt(startMatch[2]);
    const startSeconds = parseInt(startMatch[3]);
    const startPeriod = startMatch[4].toLowerCase();

    // Parse end time
    const endMatch = endTime.match(/(\d{1,2}):(\d{2}):(\d{2})\s(am|pm)/i);
    let endHours = parseInt(endMatch[1]);
    const endMinutes = parseInt(endMatch[2]);
    const endSeconds = parseInt(endMatch[3]);
    const endPeriod = endMatch[4].toLowerCase();

    // Convert to 24-hour format
    if (startPeriod === "am" && startHours === 12) {
        startHours = 0;
    } else if (startPeriod === "pm" && startHours !== 12) {
        startHours += 12;
    }

    if (endPeriod === "am" && endHours === 12) {
        endHours = 0;
    } else if (endPeriod === "pm" && endHours !== 12) {
        endHours += 12;
    }

    // Convert to total seconds
    let startTotalSeconds = startHours * 3600 + startMinutes * 60 + startSeconds;
    let endTotalSeconds = endHours * 3600 + endMinutes * 60 + endSeconds;

    // Handle overnight shifts
    if (endTotalSeconds < startTotalSeconds) {
        endTotalSeconds += 24 * 3600;
    }

    // Calculate duration
    const durationSeconds = endTotalSeconds - startTotalSeconds;

    // Convert back to h:mm:ss format
    const hours = Math.floor(durationSeconds / 3600);
    const minutes = Math.floor((durationSeconds % 3600) / 60);
    const seconds = durationSeconds % 60;

    return `${hours}:${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
}

// ============================================================
// Function 2: getIdleTime(startTime, endTime)
// startTime: (typeof string) formatted as hh:mm:ss am or hh:mm:ss pm
// endTime: (typeof string) formatted as hh:mm:ss am or hh:mm:ss pm
// Returns: string formatted as h:mm:ss
// ============================================================
function getIdleTime(startTime, endTime) {
    // Parse start time
    const startMatch = startTime.match(/(\d{1,2}):(\d{2}):(\d{2})\s(am|pm)/i);
    let startHours = parseInt(startMatch[1]);
    const startMinutes = parseInt(startMatch[2]);
    const startSeconds = parseInt(startMatch[3]);
    const startPeriod = startMatch[4].toLowerCase();

    // Parse end time
    const endMatch = endTime.match(/(\d{1,2}):(\d{2}):(\d{2})\s(am|pm)/i);
    let endHours = parseInt(endMatch[1]);
    const endMinutes = parseInt(endMatch[2]);
    const endSeconds = parseInt(endMatch[3]);
    const endPeriod = endMatch[4].toLowerCase();

    // Convert to 24-hour format
    if (startPeriod === "am" && startHours === 12) {
        startHours = 0;
    } else if (startPeriod === "pm" && startHours !== 12) {
        startHours += 12;
    }

    if (endPeriod === "am" && endHours === 12) {
        endHours = 0;
    } else if (endPeriod === "pm" && endHours !== 12) {
        endHours += 12;
    }

    // Convert to total seconds
    let startTotalSeconds = startHours * 3600 + startMinutes * 60 + startSeconds;
    let endTotalSeconds = endHours * 3600 + endMinutes * 60 + endSeconds;

    // Handle overnight shifts
    if (endTotalSeconds < startTotalSeconds) {
        endTotalSeconds += 24 * 3600;
    }

    // Business hours are 8 AM (08:00:00) to 10 PM (22:00:00)
    const businessStart = 8 * 3600;
    const businessEnd = 22 * 3600;

    let idleSeconds = 0;

    // Check if start time is before business start
    if (startTotalSeconds < businessStart) {
        const idleEnd = Math.min(endTotalSeconds, businessStart);
        idleSeconds += idleEnd - startTotalSeconds;
    }

    // Check if end time is after business end
    if (endTotalSeconds > businessEnd) {
        const idleStart = Math.max(startTotalSeconds, businessEnd);
        idleSeconds += endTotalSeconds - idleStart;
    }

    // Convert back to h:mm:ss format
    const hours = Math.floor(idleSeconds / 3600);
    const minutes = Math.floor((idleSeconds % 3600) / 60);
    const seconds = idleSeconds % 60;

    return `${hours}:${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
}

// ============================================================
// Function 3: getActiveTime(shiftDuration, idleTime)
// shiftDuration: (typeof string) formatted as h:mm:ss
// idleTime: (typeof string) formatted as h:mm:ss
// Returns: string formatted as h:mm:ss
// ============================================================
function getActiveTime(shiftDuration, idleTime) {
    // Parse shift duration
    const durationParts = shiftDuration.split(":");
    const durationHours = parseInt(durationParts[0]);
    const durationMinutes = parseInt(durationParts[1]);
    const durationSeconds = parseInt(durationParts[2]);
    
    // Parse idle time
    const idleParts = idleTime.split(":");
    const idleHours = parseInt(idleParts[0]);
    const idleMinutes = parseInt(idleParts[1]);
    const idleSeconds = parseInt(idleParts[2]);
    
    // Convert to total seconds
    let durationTotalSeconds = durationHours * 3600 + durationMinutes * 60 + durationSeconds;
    let idleTotalSeconds = idleHours * 3600 + idleMinutes * 60 + idleSeconds;
    
    // Calculate active seconds
    const activeSeconds = durationTotalSeconds - idleTotalSeconds;
    
    // Convert back to h:mm:ss format
    const hours = Math.floor(activeSeconds / 3600);
    const minutes = Math.floor((activeSeconds % 3600) / 60);
    const seconds = activeSeconds % 60;
    
    return `${hours}:${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
}

// ============================================================
// Function 4: metQuota(date, activeTime)
// date: (typeof string) formatted as yyyy-mm-dd
// activeTime: (typeof string) formatted as h:mm:ss
// Returns: boolean
// ============================================================
function metQuota(date, activeTime) {
    // TODO: Implement this function
}

// ============================================================
// Function 5: addShiftRecord(textFile, shiftObj)
// textFile: (typeof string) path to shifts text file
// shiftObj: (typeof object) has driverID, driverName, date, startTime, endTime
// Returns: object with 10 properties or empty object {}
// ============================================================
function addShiftRecord(textFile, shiftObj) {
    // TODO: Implement this function
}

// ============================================================
// Function 6: setBonus(textFile, driverID, date, newValue)
// textFile: (typeof string) path to shifts text file
// driverID: (typeof string)
// date: (typeof string) formatted as yyyy-mm-dd
// newValue: (typeof boolean)
// Returns: nothing (void)
// ============================================================
function setBonus(textFile, driverID, date, newValue) {
    // TODO: Implement this function
}

// ============================================================
// Function 7: countBonusPerMonth(textFile, driverID, month)
// textFile: (typeof string) path to shifts text file
// driverID: (typeof string)
// month: (typeof string) formatted as mm or m
// Returns: number (-1 if driverID not found)
// ============================================================
function countBonusPerMonth(textFile, driverID, month) {
    // TODO: Implement this function
}

// ============================================================
// Function 8: getTotalActiveHoursPerMonth(textFile, driverID, month)
// textFile: (typeof string) path to shifts text file
// driverID: (typeof string)
// month: (typeof number)
// Returns: string formatted as hhh:mm:ss
// ============================================================
function getTotalActiveHoursPerMonth(textFile, driverID, month) {
    // TODO: Implement this function
}

// ============================================================
// Function 9: getRequiredHoursPerMonth(textFile, rateFile, bonusCount, driverID, month)
// textFile: (typeof string) path to shifts text file
// rateFile: (typeof string) path to driver rates text file
// bonusCount: (typeof number) total bonuses for given driver per month
// driverID: (typeof string)
// month: (typeof number)
// Returns: string formatted as hhh:mm:ss
// ============================================================
function getRequiredHoursPerMonth(textFile, rateFile, bonusCount, driverID, month) {
    // TODO: Implement this function
}

// ============================================================
// Function 10: getNetPay(driverID, actualHours, requiredHours, rateFile)
// driverID: (typeof string)
// actualHours: (typeof string) formatted as hhh:mm:ss
// requiredHours: (typeof string) formatted as hhh:mm:ss
// rateFile: (typeof string) path to driver rates text file
// Returns: integer (net pay)
// ============================================================
function getNetPay(driverID, actualHours, requiredHours, rateFile) {
    // TODO: Implement this function
}

module.exports = {
    getShiftDuration,
    getIdleTime,
    getActiveTime,
    metQuota,
    addShiftRecord,
    setBonus,
    countBonusPerMonth,
    getTotalActiveHoursPerMonth,
    getRequiredHoursPerMonth,
    getNetPay
};
