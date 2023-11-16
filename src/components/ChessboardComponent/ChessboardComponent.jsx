import React from "react";
import './ChessboardComponent.css'


//Import BlackChessPieces
import RB from '../../assets/images/ChessPieces_black/r.svg';
import NB from '../../assets/images/ChessPieces_black/n.svg';
import BB from '../../assets/images/ChessPieces_black/b.svg';
import QB from '../../assets/images/ChessPieces_black/q.svg';
import KB from '../../assets/images/ChessPieces_black/k.svg';
import PB from '../../assets/images/ChessPieces_black/p.svg';

//Import BrownChessPieces
import RW from '../../assets/images/ChessPieces_brown/R.svg';
import NW from '../../assets/images/ChessPieces_brown/N.svg';
import BW from '../../assets/images/ChessPieces_brown/B.svg';
import QW from '../../assets/images/ChessPieces_brown/Q.svg';
import KW from '../../assets/images/ChessPieces_brown/K.svg';
import PW from '../../assets/images/ChessPieces_brown/P.svg';



const initialBoard = [
    ['R_B', 'N_B', 'B_B', 'Q_B', 'K_B', 'B_B', 'N_B', 'R_B'],
    ['P_B', 'P_B', 'P_B', 'P_B', 'P_B', 'P_B', 'P_B', 'P_B'],
    ['', '', '', '', '', '', '', ''],
    ['', '', '', '', '', '', '', ''],
    ['', '', '', '', '', '', '', ''],
    ['', '', '', '', '', '', '', ''],
    ['P_W', 'P_W', 'P_W', 'P_W', 'P_W', 'P_W', 'P_W', 'P_W'],
    ['R_W', 'N_W', 'B_W', 'Q_W', 'K_W', 'B_W', 'N_W', 'R_W']
];


const getPieceImage = (piece) => {
    switch (piece) {
        case 'R_B': return RB;
        case 'N_B': return NB;
        case 'B_B': return BB;
        case 'Q_B': return QB;
        case 'K_B': return KB;
        case 'P_B': return PB;
        case 'R_W': return RW;
        case 'N_W': return NW;
        case 'B_W': return BW;
        case 'Q_W': return QW;
        case 'K_W': return KW;
        case 'P_W': return PW;
        default: return '';
    }
};

const ChessboardComponent = ({ChessboardSize}) => {
    return (
        <div className="chessboardContainer" style={{ width: ChessboardSize, height:ChessboardSize}}>
        <div className="chessboard">
                {initialBoard.map((row, rowIndex) => (
                    row.map((piece, colIndex) => {
                        const pieceImage = getPieceImage(piece);
                        return (
                            <div key={`${rowIndex}-${colIndex}`} className="chess-square">
                                {pieceImage && <img src={pieceImage} alt={piece} />}
                            </div>
                        );
                    })
                ))}
            </div>
        </div>
    );
};

export default ChessboardComponent;