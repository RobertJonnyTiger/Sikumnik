"use client";

import React, { useState } from "react";
import { RefreshCcw } from "lucide-react";

/**
 * [INTERACTIVE LAB] Trade Balance Visualizer
 * Visualizes:
 * - Production Possibility Curve (PPC)
 * - World Price Line (Trade Balance Line)
 * - Production Point
 * - Consumption Point
 * - Trade Triangle
 */
export const TradeBalanceVisualizer = () => {
    const [worldPriceRatio, setWorldPriceRatio] = useState(1.5); // Px/Py
    const [productionPoint, setProductionPoint] = useState(0); // 0 = max X, 100 = max Y
    const [showTradeTriangle, setShowTradeTriangle] = useState(true);
    
    // Base values
    const maxX = 200;
    const maxY = 300;
    
    // Linear PPC: X + 1.5Y = 300 (example)
    const getPPCY = (x: number) => (maxY - (x * maxY) / maxX);
    
    // Calculate production point
    const prodX = maxX - (productionPoint / 100) * maxX;
    const prodY = getPPCY(prodX);
    
    // Calculate trade balance line (passes through production point)
    // Y - Yp = -(Px/Py)(X - Xp)
    const getTradeLineY = (x: number) => prodY - worldPriceRatio * (x - prodX);
    const getTradeLineX = (y: number) => (prodY - y) / worldPriceRatio + prodX;
    
    // Trade line intercepts
    const tradeXIntercept = getTradeLineX(0);
    const tradeYIntercept = getTradeLineY(0);
    
    // Optimal consumption (tangency point - for this linear case it's one of the intercepts)
    // For simplicity, we'll show a consumption point along the trade line
    const [consumptionX, setConsumptionX] = useState(50);
    const consumptionY = getTradeLineY(consumptionX);
    
    // Trade amounts
    const exports = Math.max(0, prodX - consumptionX);
    const imports = Math.max(0, consumptionY - prodY);
    
    const reset = () => {
        setWorldPriceRatio(1.5);
        setProductionPoint(0);
        setConsumptionX(50);
    };

    return (
        <div className="w-full bg-slate-950/50 backdrop-blur-xl border border-white/10 rounded-3xl p-6 md:p-10 shadow-2xl">
            <div className="flex flex-col lg:flex-row gap-8">
                
                {/* 1. The Graph Visualization */}
                <div className="flex-1 relative aspect-square lg:aspect-[4/3] bg-slate-900/50 rounded-2xl border border-slate-800 overflow-hidden">
                    {/* Grid Lines */}
                    <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:30px_30px]" />
                    
                    <svg className="w-full h-full" viewBox="0 0 500 400">
                        {/* Definitions */}
                        <defs>
                            <marker id="arrowhead" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
                                <polygon points="0 0, 10 3.5, 0 7" fill="#94a3b8" />
                            </marker>
                            <linearGradient id="ppcGradient" x1="0" y1="0" x2="1" y2="1">
                                <stop offset="0%" stopColor="#14b8a6" stopOpacity="0.3" />
                                <stop offset="100%" stopColor="#14b8a6" stopOpacity="0.1" />
                            </linearGradient>
                            <linearGradient id="tradeGradient" x1="0" y1="0" x2="1" y2="1">
                                <stop offset="0%" stopColor="#f59e0b" stopOpacity="0.4" />
                                <stop offset="100%" stopColor="#f59e0b" stopOpacity="0.1" />
                            </linearGradient>
                        </defs>
                        
                        {/* Axes */}
                        <line x1="40" y1="30" x2="40" y2="350" stroke="#64748b" strokeWidth="2" markerEnd="url(#arrowhead)" />
                        <line x1="40" y1="350" x2="480" y2="350" stroke="#64748b" strokeWidth="2" markerEnd="url(#arrowhead)" />
                        
                        {/* Axis Labels */}
                        <text x="250" y="390" fill="#94a3b8" textAnchor="middle" fontSize="14">מוצר X</text>
                        <text x="15" y="200" fill="#94a3b8" textAnchor="middle" fontSize="14" transform="rotate(-90, 15, 200)">מוצר Y</text>
                        
                        {/* PPC (Production Possibility Curve) */}
                        <path 
                            d={`M 40,${350 - maxY} L 40,350 L ${40 + maxX},350`} 
                            fill="none" 
                            stroke="#14b8a6" 
                            strokeWidth="3"
                            strokeLinecap="round"
                        />
                        
                        {/* PPC Label */}
                        <text x={40 + maxX/2} y={350 - maxY/2 + 20} fill="#14b8a6" fontSize="12" textAnchor="middle">
                            עקומת התמורה
                        </text>
                        
                        {/* Trade Balance Line */}
                        {tradeXIntercept > 40 && tradeXIntercept < 480 && (
                            <line 
                                x1={Math.max(40, tradeXIntercept)} 
                                y1={350} 
                                x2={40} 
                                y2={Math.max(0, 350 - Math.min(maxY * 2, tradeYIntercept))} 
                                stroke="#f59e0b" 
                                strokeWidth="3" 
                                strokeDasharray="8,4"
                            />
                        )}
                        
                        {/* Trade Balance Line Label */}
                        <text x={40 + 80} y={350 - 80} fill="#f59e0b" fontSize="11" textAnchor="middle">
                            קו מאזן מסחרי
                        </text>
                        
                        {/* Trade Triangle */}
                        {showTradeTriangle && (
                            <path
                                d={`M ${40 + prodX},${350 - prodY} L ${40 + consumptionX},${350 - consumptionY} L ${40 + prodX},${350 - prodY}`}
                                fill="url(#tradeGradient)"
                                stroke="#f59e0b"
                                strokeWidth="2"
                                strokeDasharray="4,2"
                            />
                        )}
                        
                        {/* Production Point */}
                        <circle 
                            cx={40 + prodX} 
                            cy={350 - prodY} 
                            r="8" 
                            fill="#14b8a6" 
                            stroke="white" 
                            strokeWidth="2"
                        />
                        <text x={40 + prodX + 10} y={350 - prodY - 10} fill="#14b8a6" fontSize="11" fontWeight="bold">
                            ייצור
                        </text>
                        
                        {/* Consumption Point */}
                        <circle 
                            cx={40 + consumptionX} 
                            cy={350 - consumptionY} 
                            r="8" 
                            fill="#f59e0b" 
                            stroke="white" 
                            strokeWidth="2"
                        />
                        <text x={40 + consumptionX + 10} y={350 - consumptionY + 20} fill="#f59e0b" fontSize="11" fontWeight="bold">
                            צריכה
                        </text>
                        
                        {/* Export Arrow */}
                        {exports > 0 && (
                            <g>
                                <line 
                                    x1={40 + prodX} 
                                    y1={350 - prodY} 
                                    x2={40 + consumptionX} 
                                    y2={350 - prodY} 
                                    stroke="#ef4444" 
                                    strokeWidth="2" 
                                    markerEnd="url(#arrowhead)"
                                />
                                <text x={(40 + prodX + 40 + consumptionX)/2} y={350 - prodY - 8} fill="#ef4444" fontSize="10" textAnchor="middle">
                                    יצוא
                                </text>
                            </g>
                        )}
                        
                        {/* Import Arrow */}
                        {imports > 0 && (
                            <g>
                                <line 
                                    x1={40 + prodX} 
                                    y1={350 - prodY} 
                                    x2={40 + prodX} 
                                    y2={350 - consumptionY} 
                                    stroke="#3b82f6" 
                                    strokeWidth="2" 
                                    markerEnd="url(#arrowhead)"
                                />
                                <text x={40 + prodX + 8} y={(350 - prodY + 350 - consumptionY)/2} fill="#3b82f6" fontSize="10">
                                    יבוא
                                </text>
                            </g>
                        )}
                    </svg>
                    
                    {/* Legend */}
                    <div className="absolute bottom-2 left-2 flex gap-3 text-xs">
                        <div className="flex items-center gap-1">
                            <div className="w-3 h-3 rounded-full bg-teal-500" />
                            <span className="text-slate-400">ייצור</span>
                        </div>
                        <div className="flex items-center gap-1">
                            <div className="w-3 h-3 rounded-full bg-amber-500" />
                            <span className="text-slate-400">צריכה</span>
                        </div>
                    </div>
                </div>
                
                {/* 2. Controls */}
                <div className="w-full lg:w-80 space-y-6">
                    <div className="flex items-center justify-between">
                        <h3 className="text-lg font-bold text-white">פרמטרים</h3>
                        <button 
                            onClick={reset}
                            className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors"
                        >
                            <RefreshCcw size={18} />
                        </button>
                    </div>
                    
                    {/* World Price Ratio Slider */}
                    <div className="space-y-3">
                        <div className="flex justify-between items-center">
                            <label className="text-sm font-medium text-slate-300">
                                יחס מחירים עולמי (Px/Py)
                            </label>
                            <span className="text-lg font-bold text-amber-400">{worldPriceRatio.toFixed(1)}</span>
                        </div>
                        <input
                            type="range"
                            min="0.5"
                            max="3"
                            step="0.1"
                            value={worldPriceRatio}
                            onChange={(e) => setWorldPriceRatio(parseFloat(e.target.value))}
                            className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-amber-500"
                        />
                        <div className="flex justify-between text-xs text-slate-500">
                            <span>זול לייצא Y</span>
                            <span>זול לייצא X</span>
                        </div>
                    </div>
                    
                    {/* Production Point Slider */}
                    <div className="space-y-3">
                        <div className="flex justify-between items-center">
                            <label className="text-sm font-medium text-slate-300">
                                נקודת ייצור
                            </label>
                            <span className="text-sm text-teal-400">
                                X: {Math.round(prodX)}, Y: {Math.round(prodY)}
                            </span>
                        </div>
                        <input
                            type="range"
                            min="0"
                            max="100"
                            step="1"
                            value={productionPoint}
                            onChange={(e) => {
                                setProductionPoint(parseInt(e.target.value));
                                setConsumptionX(Math.min(prodX, 50));
                            }}
                            className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-teal-500"
                        />
                        <div className="flex justify-between text-xs text-slate-500">
                            <span>רק X</span>
                            <span>רק Y</span>
                        </div>
                    </div>
                    
                    {/* Consumption Point Slider */}
                    <div className="space-y-3">
                        <div className="flex justify-between items-center">
                            <label className="text-sm font-medium text-slate-300">
                                נקודת צריכה
                            </label>
                            <span className="text-sm text-amber-400">
                                X: {Math.round(consumptionX)}, Y: {Math.round(Math.max(0, consumptionY))}
                            </span>
                        </div>
                        <input
                            type="range"
                            min="0"
                            max={Math.max(prodX, 100)}
                            step="1"
                            value={consumptionX}
                            onChange={(e) => setConsumptionX(parseInt(e.target.value))}
                            className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-amber-500"
                        />
                    </div>
                    
                    {/* Toggle Trade Triangle */}
                    <label className="flex items-center gap-3 cursor-pointer">
                        <input
                            type="checkbox"
                            checked={showTradeTriangle}
                            onChange={(e) => setShowTradeTriangle(e.target.checked)}
                            className="w-5 h-5 rounded bg-slate-800 border-slate-600 text-teal-500 focus:ring-teal-500"
                        />
                        <span className="text-sm text-slate-300">הצג משולש סחר</span>
                    </label>
                    
                    {/* Results Summary */}
                    <div className="p-4 rounded-xl bg-slate-900/50 border border-slate-800 space-y-2">
                        <h4 className="text-sm font-bold text-slate-300">תוצאות הסחר:</h4>
                        <div className="flex justify-between text-sm">
                            <span className="text-red-400">יצוא X:</span>
                            <span className="text-white font-mono">{Math.round(exports)}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                            <span className="text-blue-400">יבוא Y:</span>
                            <span className="text-white font-mono">{Math.round(Math.max(0, imports))}</span>
                        </div>
                    </div>
                    
                    {/* Decision */}
                    <div className="p-4 rounded-xl bg-slate-900/50 border border-slate-800">
                        <h4 className="text-sm font-bold text-slate-300 mb-2">מסקנה:</h4>
                        <p className="text-sm text-slate-400">
                            {worldPriceRatio > 1.5 ? (
                                <span className="text-teal-400">כדאי לייצא X (המחיר העולמי גבוה)</span>
                            ) : worldPriceRatio < 1 ? (
                                <span className="text-blue-400">כדאי לייבא X (המחיר העולמי נמוך)</span>
                            ) : (
                                <span className="text-slate-400">אין יתרון ברור לסחר</span>
                            )}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};
