import mb from 'mock-browser'
try {
  window
} catch (e) {
  const MockBrowser = mb.mocks.MockBrowser
  global.window = MockBrowser.createWindow()
}

import History from '../'
 
describe('History', () => {

  it('set method', () => {
    const h = new History('foo')
    h.set('bar')
    expect(window.location.hash).toEqual('#foo=bar')
  })

  it('get method', () => {
    const h = new History('foo')
    h.set('bar')
    expect(h.get()).toEqual('bar')
  })

  it('get from previously set url', () => {
    window.location.href = 'about:blank#foo=bar2'
    const h = new History('foo')
    expect(h.get()).toEqual('bar2')
  })

  it('fires a change event when the right part of the url changes', (done) => {
    window.location.href = 'about:blank#foo=bar2'
    const spy = jasmine.createSpy('spy')
    const h = new History('foo').on('change', spy)
    setTimeout(() => {
      window.location.href = 'about:blank#foo=bar99'
      setTimeout(() => {
        expect(spy.calls.count()).toEqual(1)
        done()
      }, 20)
    }, 20)
  })

  it('does not fire a change event when an irrelevant part of the url changes', (done) => {
    window.location.href = 'about:blank#foo=1&bar=2'
    const spy = jasmine.createSpy('spy')
    const h = new History('foo').on('change', spy)
    setTimeout(() => {
      window.location.href = 'aboute:blank#foo=1&bar=3'
      setTimeout(() => {
        expect(spy.calls.count()).toEqual(0)
        done()
      }, 20)
    }, 20)
  })

})

export default {}