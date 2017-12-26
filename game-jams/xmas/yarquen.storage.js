var Yarquen = {
  LocalStorage: {
      get: function (key) {
          var jsonContent = localStorage[key];
          if (jsonContent && jsonContent.length > 0) {
              try {
                  JSON.parse(jsonContent);
                  return JSON.parse(jsonContent);
              } catch (e) {
                  return null;
              }
          }
          return null;
      },
      set: function (key, value) {
          if (value && value != null)
              localStorage[key] = JSON.stringify(value);
          else
              localStorage.removeItem(key);
      }
  }
};
