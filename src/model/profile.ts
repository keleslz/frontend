interface Avatar {
    src: string;
    alt?: string
}

export interface Profile {
    id: number;
    login: string;
    avatar: Avatar;
    link: string;
    selected: boolean
}