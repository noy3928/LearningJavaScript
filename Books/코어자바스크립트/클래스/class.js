class DataContainer {
    #data; // (A)
    constructor() {
      Promise.resolve('downloaded')
        .then(data => this.#data = data); // (B)
    }
    getData() {
      return 'DATA: '+this.#data; // (C)
    }
  }
  

const dc = new DataContainer();
assert.equal(dc.getData(), 'DATA: undefined');
setTimeout(() => assert.equal(
dc.getData(), 'DATA: downloaded'), 0);
