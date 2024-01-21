eel.expose(setLoading);

function setLoading(loading) {
    document.body.style.cursor = loading ? 'wait' : 'default';
}
