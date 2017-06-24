import * as React from 'react';
import {renderToString} from 'react-dom/server';

export class IndexComponent extends React.Component<{}, {}> {
    render() {
        return (
            <div>
                Hello SSR!!
            </div>
        );
    }

    static toString(): string {
        return renderToString(<IndexComponent/>)
    }

}

