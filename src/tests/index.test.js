

describe('loading', () => {

    it('should run tests', () => {
        return true;
    });
})


describe('createElement', () => {
    it('should be a dom element ', () => {
    let el = window.document.createElement('div');
    assert.isFunction(el.click);
});
});
