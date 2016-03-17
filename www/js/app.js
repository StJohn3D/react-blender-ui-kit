requirejs.config({
    //By default load any module IDs from js/lib
    baseUrl: 'js/lib',
    //except, if the module ID starts with "app",
    //load it from the js/app directory. paths
    //config is relative to the baseUrl, and
    //never includes a ".js" extension since
    //the paths config could be for a directory.
    paths: {
        components      : '../components',
        react           : 'react-with-addons.min',
        reactDOM        : 'react-dom.min',
        JSXTransformer  : 'jsx-transformer',
        jsx             : 'jsx',
    },
    jsx: {
        fileExtension: '.jsx',
    }
});

// Start the main app logic.
requirejs(['react', 'reactDOM', 'jsx!components/app'],
function   (React,   ReactDOM, app) {
    //React, and the react-dom modules are all
    //loaded and can be used here now.
    // React.renderComponent(
    //     <Timer />,
    //     document.getElementById('react-blender-ui')
    // );
    // ReactDOM.render(
    //  <App />,
    //  document.getElementById("react-blender-ui")
    // );
    ReactDOM.render(
      React.createElement(app),
      document.getElementById("react-blender-ui")
    );
    console.log(app);
});