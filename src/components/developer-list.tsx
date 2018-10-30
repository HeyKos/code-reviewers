import * as React from 'react';

// ----------------------------------------------------------
// Interfaces
// ----------------------------------------------------------

interface Developer {
    id:   number;
    name: string;
}

interface Pair {
    coder:    Developer;
    reviewer: Developer;
}

interface ComponentState {
    pairs: Pair[];
}

// ----------------------------------------------------------
// Constants
// ----------------------------------------------------------

const developers: Developer[]  = [
    { id: 1,    name: 'Andrew Cameron' },
    { id: 16,   name: 'Brandon Scott' },
    { id: 2,    name: 'Dylan Justice' },
    { id: 3,    name: 'Jim Stevenson' },
    { id: 4,    name: 'Jon Hollinger' },
    { id: 17,   name: 'Josh Hughes' },
    { id: 19,   name: 'Josh Peters' },
    { id: 5,    name: 'Josh Randall' },
    { id: 6,    name: 'Kevin Busch' },
    { id: 7,    name: 'LaVonne Eby' },
    { id: 8,    name: 'Matt Musselman' },
    { id: 9,    name: 'Mike Koser' },
    { id: 10,   name: 'Phil Hess' },
    { id: 11,   name: 'Scott Savage' },
    { id: 13,   name: 'Stefanie Leitch' },
    { id: 20,   name: 'Torrance Graham' },
    { id: 18,   name: 'Von Bock' },
    { id: 14,   name: 'Winton DeShong' },
    { id: 15,   name: 'Zach McCleaf' },
];

// ----------------------------------------------------------
// Component
// ----------------------------------------------------------

export class DeveloperList extends React.PureComponent<{}, ComponentState> {

    // ----------------------------------------------------------
    // Constructor
    // ----------------------------------------------------------

    constructor(props: any) {
        super(props);

        this._onRotateClick = this._onRotateClick.bind(this);
        this.state = {
            pairs: [],
        };
    }

    // ----------------------------------------------------------
    // Public Methods
    // ----------------------------------------------------------

    public componentDidMount() {
        this._generatePairs();
    }
    
    public render() {
        return (
            <section className="c-developer-list">
                <button onClick={this._onRotateClick}>Rotate</button>
                <table>
                    <thead>
                        <tr>
                            <th>Coder</th>
                            <th>Reviewer</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.pairs.map(this._renderPair)}
                    </tbody>
                </table>
            </section>
        );
    }

    // ----------------------------------------------------------
    // Private Methods
    // ----------------------------------------------------------

    private _generatePairs() {
        const pairs: Pair[] = [];
        let counter = 0;

        while (counter < developers.length) {
            const coder = developers[counter];
            const reviewer = counter + 1 >= developers.length ? developers[0] : developers[counter + 1];
            pairs.push({ coder: coder, reviewer: reviewer });
            counter += 1;
        }

        this.setState({
            pairs: pairs,
        });
    }

    private _renderPair(pair: Pair, index: number) {
        if (pair === undefined || pair.coder === undefined || pair.reviewer === undefined) {
            return null;
        }

        return (
            <tr key={index}>
                <td>{pair.coder.name}</td>
                <td>{pair.reviewer.name}</td>
            </tr>
        );
    }

    // ----------------------------------------------------------
    // Event Handlers
    // ----------------------------------------------------------

    private _onRotateClick() {
        const newPairs: Pair[] = [];
        developers.forEach((developer, index) => {
            // find the developer in the pairs listing then find the developer in pairs that is 2 
            // ahead of them in the queue
            const currentPairIndex = this.state.pairs.findIndex((p) => p.coder.id === developer.id); 
            // get previous pair until you're not reviewing yourself.
            let nextIndex = currentPairIndex !== 0 ? currentPairIndex - 1 : this.state.pairs.length - 1;
            let nextPair = this.state.pairs[nextIndex];
            while (developer.id === nextPair.reviewer.id) {
                nextIndex = nextIndex - 1 < 0 ? this.state.pairs.length - 1 : nextIndex - 1;
                nextPair = this.state.pairs[nextIndex];
            }

            newPairs.push({
                coder:    developer,
                reviewer: nextPair.reviewer,
            });
        });

        this.setState({pairs: newPairs});
    }
}