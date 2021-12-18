export default class Helpers {
  static dateTimeFormatToString(date: string): string {
    const dateTime = new Date(date);
    return dateTime.toLocaleString('id-ID', {
      timeZone: 'UTC',
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      second: undefined,
      hour12: true,
    });
  }

  static titleToSlugAndRemoveSpecialCharacter(title: string): string {
    const slug = title
      .toLowerCase()
      .replace(/[^\w ]+/g, '')
      .replace(/ +/g, '-');
    return slug;
  }
}
