import { MaterialReactTable } from 'material-react-table';
import { Button } from '@mui/material';
import { mkConfig, generateCsv, download } from 'export-to-csv';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import DownloadIcon from '@mui/icons-material/Download';
import VisibilityIcon from '@mui/icons-material/Visibility';
import './MUI.css';

export default function Datatable({ columns, data, onEdit, onView, onDelete, permissions }) {

    const excludedFields = ['_id', 'answer', 'password', '__v', 'images'];

    const handleExportCsv = () => {
        const filteredData = data.map(row => {
            const filteredRow = { ...row };
            excludedFields.forEach(field => delete filteredRow[field]);

            if (filteredRow.category && typeof filteredRow.category === 'object') {
                filteredRow.category = filteredRow.category.name || 'N/A';
            }

            return filteredRow;
        });

        const csvConfig = mkConfig({
            fieldSeparator: ',',
            decimalSeparator: '.',
            useKeysAsHeaders: true,
        });

        const csv = generateCsv(csvConfig)(filteredData);
        download(csvConfig)(csv);
    };


    const dynamicColumns = [
        {
            id: 'serial',
            header: 'SL',
            size: 50,
            Cell: ({ row }) => {
                return data.length - row.index;
            },
        },


        ...columns,
        {
            id: 'actions',
            header: 'Actions',
            size: 100,
            Cell: ({ row }) => (
                <div className="space-x-2">
                    {permissions.canView && (
                        <button
                            className="px-2 rounded shadow hover:shadow-2xl text-xs bg-slate-100 [&>svg]:w-[15px] hover:bg-slate-300"
                            onClick={() => onView(row.original)}
                        >
                            <VisibilityIcon />
                        </button>
                    )}

                    {permissions.canEdit && (
                        <button
                            className="px-2 rounded shadow hover:shadow-2xl text-xs bg-orange-100 [&>svg]:w-[15px] hover:bg-orange-300"
                            onClick={() => onEdit(row.original)}
                        >
                            <EditIcon />
                        </button>
                    )}

                    {permissions.canDelete && (
                        <button
                            className="px-2 rounded shadow hover:shadow-2xl text-xs text-red-400 bg-red-100 [&>svg]:w-[15px] hover:bg-red-300"
                            onClick={() => onDelete(row.original)}
                        >
                            <DeleteIcon />
                        </button>
                    )}
                </div>
            ),
        },
    ];

    return (
        <MaterialReactTable
            data={data}
            columns={dynamicColumns}
            enableFullScreenToggle={false}
            enableDensityToggle={false}
            initialState={{ density: 'compact' }}
            muiPaginationProps={{ rowsPerPageOptions: [10, 20, 50] }}
            enableColumnActions={false}
            enableCellActions={true}
            renderTopToolbarCustomActions={() => (
                <section>
                    <Button className="!text-black !text-xs" onClick={handleExportCsv} startIcon={<DownloadIcon />}>
                        Download
                    </Button>
                </section>
            )}
        />
    );
}

