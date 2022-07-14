export function getInitials(name: string) {
    var names = name.split(' '),
        initials = names[0].substring(0, 1).toUpperCase();

    if (names.length > 1) {
        initials += names[names.length - 1].substring(0, 1).toUpperCase();
    }
    return initials;
};

export function generateRandomColor() {
    return "#" + Math.floor(Math.random() * 16777215).toString(16);
}