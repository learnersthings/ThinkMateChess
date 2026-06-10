import React, { Suspense } from 'react';
import { View } from 'react-native';
import { Canvas, useLoader } from '@react-three/fiber/native';
import { Box, Billboard, useTexture, OrbitControls } from '@react-three/drei/native';
import { getPieceAssetSource } from '../game/pieceAssets';
import { toSquare } from '../game/square';
import { PieceStyle } from '../context/GameSettingsContext';

function FallbackPiece({ position, color }: any) {
    return (
        <group position={position}>
            <mesh position={[0, 0, 0]}>
                <cylinderGeometry args={[0.3, 0.4, 0.8]} />
                <meshStandardMaterial color={color} />
            </mesh>
        </group>
    );
}

function PieceTexture({ source, position }: any) {
    // In React Native, we MUST use useTexture from drei/native to avoid 'document' errors from three.js
    const texture = useTexture(source);

    return (
        <Billboard position={position}>
            <mesh>
                <planeGeometry args={[1.05, 1.05]} />
                <meshBasicMaterial map={texture} transparent alphaTest={0.5} />
            </mesh>
        </Billboard>
    );
}

function PieceSprite({ piece, pieceStyle, position }: any) {
    const source = getPieceAssetSource(piece.color, piece.type, pieceStyle);
    if (!source) return null;

    const fallbackColor = piece.color === 'w' ? '#ffffff' : '#444444';

    return (
        <Suspense fallback={<FallbackPiece position={position} color={fallbackColor} />}>
            <PieceTexture source={source} position={position} />
        </Suspense>
    );
}

interface Board3DProps {
    board: any[][];
    handlePress: (row: number, col: number) => void;
    selected: string | null;
    legalMoves: string[];
    lastMove: { from: string; to: string } | null;
    boardColors: { lightSquare: string; darkSquare: string };
    pieceStyle: PieceStyle;
}

export default function Board3D({
    board,
    handlePress,
    selected,
    legalMoves,
    lastMove,
    boardColors,
    pieceStyle
}: Board3DProps) {

    const isLightSquare = (i: number, j: number) => (i + j) % 2 === 0;

    return (
        <View style={{ width: '100%', height: 400, marginTop: 10 }}>
            {/* Player perspective: Sitting behind the white pieces, looking across the board */}
            <Canvas camera={{ position: [0, 6, 8], fov: 55 }}>
                <ambientLight intensity={0.6} />
                <directionalLight position={[10, 10, 10]} intensity={1.5} />
                <OrbitControls enablePan={false} maxPolarAngle={Math.PI / 2 - 0.1} />

                <group position={[-3.5, 0, -3.5]}>
                    {board.map((row, i) =>
                        row.map((square, j) => {
                            const sq = toSquare(j, i);

                            const x = j;
                            const z = i;
                            const y = 0;

                            const isLight = isLightSquare(i, j);
                            let color = isLight ? boardColors.lightSquare : boardColors.darkSquare;

                            if (selected === sq) color = "#4aa3ff";
                            else if (legalMoves.includes(sq)) color = "#245bdd";
                            else if (lastMove?.from === sq || lastMove?.to === sq) {
                                color = "#ffd700";
                            }

                            return (
                                <group key={`${i}-${j}`} position={[x, y, z]}>
                                    <Box
                                        args={[1, 0.2, 1]}
                                        position={[0, -0.1, 0]}
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            handlePress(i, j);
                                        }}
                                    >
                                        <meshStandardMaterial color={color} />
                                    </Box>

                                    {square?.type && pieceStyle !== "symbol" && (
                                        <PieceSprite
                                            piece={square}
                                            pieceStyle={pieceStyle}
                                            position={[0, 0.55, 0]}
                                        />
                                    )}
                                </group>
                            );
                        })
                    )}
                </group>
            </Canvas>
        </View>
    );
}
