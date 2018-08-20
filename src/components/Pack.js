import React, { Component } from 'react';

class Pack extends Component {
    static defaultProps = {
        packages: {results: []}
    }

    render() {
        const content = this.renderPackages();
        return (
            <div>{ content }</div>
        );
    }

    renderPackages() {
        if (this.props.packages['results'].length > 0) {
            return this.props.packages['results'].map((pack) =>
                <div key={pack.name}>
                    <h3>
                        <a href={ pack.url } title="View package details on packagist.org" target="_blank">
                        { pack.name }
                        </a>
                    </h3>
                    <p>{ pack.description }</p>
                    <div><strong>Downloads</strong>: { pack.downloads }. <strong>Favorites</strong>: { pack.favers }</div>
                    <hr />
                </div>
            );
        }

        return (
            <div className="alert alert-warning">
                <h3>No packages were found</h3>
            </div>
        );
    }
}

export default Pack;
