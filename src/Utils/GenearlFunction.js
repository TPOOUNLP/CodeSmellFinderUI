function removeLastDirectoryPartOf(path, direcory) {
    let newPath = path.split('/')
    let last = newPath.pop()
    while (last !== direcory) {
        last = newPath.pop();
    };
    newPath.push(last)
    return (newPath.join('/'));
}

export {
    removeLastDirectoryPartOf
}