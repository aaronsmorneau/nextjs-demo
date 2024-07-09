interface Post {
    _id?: string;
    dweet: string;
    tag: string;
    creator?: Creator;
}

interface Creator {
    username: string;
    email: string;
    image: string;
    name: string;
    id: string;
}

interface User {
    _id: string;
    email: string;
    username: string;
    image: string;
    name: string;
}