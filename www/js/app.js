requirejs.config({
    //By default load any module IDs from js/lib
    baseUrl: 'js/lib',
    //paths config is relative to the baseUrl,
    //and never includes a ".js" extension since
    //the paths config could be for a directory.
    paths: {
        _    : '../components',
        flux : '../flux',
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
requirejs(['react', 'reactDOM', 'jsx!_/app'],
function   (React,   ReactDOM,         app) {
    ReactDOM.render(
      React.createElement(app), //  <App />,
      document.getElementById("react-blender-ui")
    );
});