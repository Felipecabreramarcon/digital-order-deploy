export const getNameInitials = (name: string) => {
    return name?.split(" ")
        .map((name) => name[0].toUpperCase())
        .join("");
} 