export type Optional<O, K extends keyof O> = Omit<O, K> & Partial<Pick<O, K>>
