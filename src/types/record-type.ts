type Record<K extends keyof unknown, T> = { [P in K]: T };

export { Record };
