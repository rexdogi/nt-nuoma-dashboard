import * as React from 'react';

export default function withTranslations(WrappedComponent, translations) {
    // ...and returns another component...
    return class extends React.Component {
        constructor(props) {
            super(props);
            console.log(this);
        }

        render() {
            return <WrappedComponent {...this.props} />;
        }
    };
}