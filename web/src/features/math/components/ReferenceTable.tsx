import React from 'react';
import { ReferenceTableBlock } from '@/types/math-course';
import 'katex/dist/katex.min.css';
import { InlineMath } from 'react-katex';
import { renderMathText } from '@/utils/renderMathText';

interface ReferenceTableProps {
    block: ReferenceTableBlock;
    columnHeaders?: {
        ruleName?: string;
        generalForm?: string;
        numericExample?: string;
        streetExplanation?: string;
    };
}

export const ReferenceTable: React.FC<ReferenceTableProps> = ({
    block,
    columnHeaders = {}
}) => {
    // Merge provided headers with Hebrew defaults
    const headers = {
        ruleName: columnHeaders.ruleName || 'כלל',
        generalForm: columnHeaders.generalForm || 'צורה כללית',
        numericExample: columnHeaders.numericExample || 'דוגמה מספרית',
        streetExplanation: columnHeaders.streetExplanation || 'הסבר רחוב'
    };

    return (
        <div className="group my-10 w-full overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-gray-400/60 hover:shadow-lg hover:shadow-gray-400/20 dark:border-gray-800 dark:bg-gray-950 dark:hover:border-gray-500/50 dark:hover:shadow-gray-500/20" dir="rtl">
            {/* Table Header / Category */}
            <div className="border-b border-gray-200 bg-gray-50 px-6 py-4 dark:border-gray-800 dark:bg-gray-900/50 text-right">
                <h3 className="text-lg font-semibold tracking-tight text-gray-900 dark:text-gray-100">
                    {block.tableCategory}
                </h3>
                {block.title && (
                    <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                        {block.title}
                    </p>
                )}
            </div>

            {/* Table Content */}
            <div className="overflow-x-auto">
                {/* The table defaults to RTL reading order so the first <th> goes to the far right. */}
                <table className="w-full text-right text-sm text-gray-600 dark:text-gray-300">
                    <thead className="bg-white text-sm font-semibold text-gray-500 dark:bg-gray-950 dark:text-gray-400">
                        <tr>
                            <th scope="col" className="px-6 py-5">
                                {headers.ruleName}
                            </th>
                            <th scope="col" className="px-6 py-5">
                                {headers.generalForm}
                            </th>
                            <th scope="col" className="px-6 py-5">
                                {headers.numericExample}
                            </th>
                            <th scope="col" className="px-6 py-5">
                                {headers.streetExplanation}
                            </th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
                        {block.rows.map((row) => (
                            <tr
                                key={row.id}
                                className="group transition-colors hover:bg-gray-50/50 dark:hover:bg-gray-900/20"
                            >
                                {/* Rule Name */}
                                <td className="whitespace-nowrap px-6 py-5 font-medium text-gray-900 dark:text-gray-100">
                                    {row.ruleName}
                                </td>

                                {/* General Form (KaTeX) */}
                                <td className="whitespace-nowrap px-6 py-5 text-lg" dir="ltr">
                                    <div className="inline-flex w-max whitespace-nowrap rounded bg-blue-50/50 px-3 py-1.5 text-left text-blue-900 dark:bg-blue-900/20 dark:text-blue-100">
                                        <InlineMath math={row.generalForm} />
                                    </div>
                                </td>

                                {/* Numeric Example (KaTeX) */}
                                <td className="whitespace-nowrap px-6 py-5 text-lg" dir="ltr">
                                    <div className="inline-flex w-max whitespace-nowrap rounded bg-amber-50/50 px-3 py-1.5 text-left text-amber-900 dark:bg-amber-900/20 dark:text-amber-100">
                                        <InlineMath math={row.numericExample} />
                                    </div>
                                </td>

                                {/* Street Explanation */}
                                <td className="min-w-[300px] px-6 py-5 text-base leading-relaxed">
                                    <div className="border-r-2 border-indigo-400 pr-3 text-indigo-700 dark:text-indigo-400">
                                        {renderMathText(row.streetExplanation)}
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};
