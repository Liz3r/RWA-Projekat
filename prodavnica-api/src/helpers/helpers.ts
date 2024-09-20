export const StringToNumber = (strNumber: string): number | null => {

    if(Number.isNaN(strNumber))
        return null

    const num = Number(strNumber);
    return num;
}