var windowAvailable = false;
try {
    windowAvailable = !!(window || null);
} catch (e) {

}

export { windowAvailable };