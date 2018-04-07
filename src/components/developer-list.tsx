import * as React from 'react';

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

const developers: Developer[]  = [
    { id: 1,    name: 'Andrew Cameron' },
    { id: 2,    name: 'Dylan Justice' },
    { id: 3,    name: 'Jim Stevenson' },
    { id: 4,    name: 'Jon Hollinger' },
    { id: 5,    name: 'Josh Randall' },
    { id: 6,    name: 'Kevin Busch' },
    { id: 7,    name: 'LaVonne Eby' },
    { id: 8,    name: 'Matt Musselman' },
    { id: 9,    name: 'Mike Koser' },
    { id: 10,   name: 'Phil Hess' },
    { id: 11,   name: 'Scott Savage' },
    { id: 12,   name: 'Shane Shearer' },
    { id: 13,   name: 'Stefanie Leitch' },
    { id: 14,   name: 'Winton DeShong' },
    { id: 15,   name: 'Zach McCleaf' },
];

export class DeveloperList extends React.PureComponent<{}, ComponentState> {
    constructor(props: any) {
        super(props);

        this.state = {
            pairs: [],
        };
    }

    public componentDidMount() {
        this._generatePairs();
    }
    
    public render() {
        return (
            <table className="c-developer-list">
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
        );
    }

    private _generatePairs() {
        const pairs: Pair[] = [];
        let counter = 0;

        while (counter < developers.length) {
            const coder = developers[counter];
            const reviewer = counter + 1 >= developers.length ? developers[0] : developers[counter + 1];
            pairs.push({ coder: coder, reviewer: reviewer });
            counter += 2;
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
}