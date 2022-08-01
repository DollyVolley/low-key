export function getFormattedDateTime(timeStamp: number): string {
    const date = new Date(timeStamp)
    const timeString = date.toLocaleTimeString('de-DE')
    const hourAndMinute = timeString.split(':')
    return `${hourAndMinute[0]}:${hourAndMinute[1]}`
}
