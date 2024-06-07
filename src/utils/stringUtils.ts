export const isNumber = (str: string) => {
    return !isNaN(Number(str));
};

export const capitalizeAllWords = (str: string) => {
    const words = str.split(" ");

    for (let i = 0; i < words.length; i++) {
        words[i] = words[i].charAt(0).toUpperCase() + words[i].slice(1);
    }

    return words.join(" ");
};

export const capitalize = (str: string) => {
    if (!str) return str;
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
};