import React from 'react';
import {Button, withStyles, withTheme} from "material-ui";
import {connect} from "react-redux";
import {bindActionCreators, compose} from "redux";
import {
    AlertButton,
    LanguageSelect,
    Module,
    ModuleContent,
    ModuleFooter,
    ModuleToolbar,
    MyProgressBar,
    MyTextField,
    Right
} from 'components/index';

import {
    destroyCity,
    editCity,
    reset,
    setField,
    setCityField,
    storeCity,
    updateCity,
    initTranslations,
    setTranslationField
} from "redux/modules/city/index";

import withTranslations from 'HOC/languageHOC';

import {getLanguages} from "redux/modules/language";

class CitiesManage extends React.Component {

    componentDidMount() {
        const {match, reset, editCity, initTranslations, getLanguages, languages} = this.props;
        reset();
        if (match.params.id) {
            editCity(match.params.id);
        } else {
            initTranslations();
        }
    }

    handleChange = name => event => {
        this.props.setCityField(event.target.value, name);
    };

    handleTranslationChange = name => event => {
        const {setTranslationField, languageId} = this.props;
        setTranslationField(event.target.value, name, languageId);
    };

    handleLanguageChange = () => event => {
        this.props.setField(event.target.value, 'languageId');
    };

    handleSubmit = () => {
        const {city, match, storeCity, updateCity} = this.props;
        if (match.params.id) {
            updateCity(city)
        } else {
            storeCity(city)
        }
    };

    handleDestroy = () => {
        const {destroyCity, match} = this.props;
        destroyCity(match.params.id);
    };

    render() {
        const {classes, match, errors, failed, success, loading, city, languageId, translations} = this.props;

        const translatableFields = () => {
           const translation = city.translations.find(t => t.language.id === languageId);
           const {title = ''} = translation || {};
           return (
               <MyTextField
                   fullWidth
                   errors={errors}
                   errorPrefix={true}
                   field="title"
                   label="Title"
                   value={title}
                   margin="normal"
                   onChange={this.handleTranslationChange('title')}
               />
           )
        };

        return (
            <div>
                <ModuleToolbar
                    title='Cities'
                >
                   <LanguageSelect
                       value={languageId}
                       onChange={this.handleLanguageChange()}
                   />
                </ModuleToolbar>
                <div className={classes.module}>
                    <Module>
                        <ModuleContent>
                            <div className={classes.contentRoot}>
                                {translatableFields()}
                            </div>
                        </ModuleContent>
                        <ModuleFooter>
                            <Button
                                disabled={loading}
                                color="primary"
                                raised
                                onClick={this.handleSubmit}
                            >
                                {match.params.id ? 'Update' : 'Create'}
                            </Button>
                            <Right>
                                {match.params.id &&
                                <AlertButton onClick={this.handleDestroy} disabled={loading} color="accent"
                                             raised>Delete</AlertButton>
                                }
                            </Right>
                        </ModuleFooter>
                        <MyProgressBar failed={failed} loading={loading} success={success}/>
                    </Module>
                </div>
            </div>
        );
    }
}

const styles = theme => ({
    headerTitle: {
        display: 'inline'
    },
    contentRoot: {
        paddingLeft: 16,
        paddingBottom: 16
    },
    module: {
        padding: 16
    },
    formControl: {
        minWidth: 120,
    },
    selectEmpty: {
        marginTop: theme.spacing.unit * 2,
    },
});

function mapStateToProps(state) {
    return {
        errors: state.city.manageErrors,
        loading: state.city.manageLoading,
        success: state.city.manageSuccess,
        failed: state.city.manageFailed,
        languages: state.language.languages,
        languageId: state.city.languageId,
        city: state.city.city,
        translations: state.city.entities.translations,
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        storeCity,
        reset,
        setField,
        editCity,
        updateCity,
        destroyCity,
        setCityField,
        initTranslations,
        setTranslationField,
        getLanguages
    }, dispatch)
}

export default compose(
    withStyles(styles, {
        name: 'CitiesManage'
    }),
    withTheme(),
    connect(mapStateToProps, mapDispatchToProps),
    withTranslations
)(CitiesManage)
