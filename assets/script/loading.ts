function loading(_class: any) {
  _class.$nextTick(() => {
    _class.$nuxt.$loading.start();

    setTimeout(() => _class.$nuxt.$loading.finish(), 1000);
  });
}

export {loading}