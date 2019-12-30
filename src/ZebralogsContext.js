import React from 'react';

const ZebralogsContext = React.createContext({
    zebralogs: [],
    addZebralog: () => {},
    deleteZebralog: () => {},
    updateZebralog: () => {},
    onChange: () => {},
});

export default ZebralogsContext;