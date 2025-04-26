export const createEnum = <const Keys extends readonly string[]>(list: Keys): { [K in Keys[number]]: K } => {
    return list.reduce(
        (acc, key) => {
            acc[key] = key;
            return acc;
        }, {} as { [K in Keys[number]]: K }
    )
}