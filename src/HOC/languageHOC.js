import * as React from 'react';

const withTranslations = language => WrappedComponent => {

    const translations = {
        ["city"]: {en: 'City', lt: 'Miestas'},
        ["cities"]: {en: 'Cities', lt: 'Miestai'}
    };

    return class extends React.Component {
        constructor(props) {
            super(props);
        }

        t(keyword) {
            console.log(translations);
            console.log(translations[keyword]);
            return translations[keyword][language]
        }

        render() {
            return <WrappedComponent t={this.t} {...this.props} />;
        }
    };
};

export default withTranslations;