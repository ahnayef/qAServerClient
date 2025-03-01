export const isAuthenticated = (): boolean => {
    const user = JSON.parse(localStorage.getItem("user") || "{}");
    return !!user.id;
};