@extends('layouts.app')

@section('content')
<div class="container py-4">
    <h2 class="mb-4">Registros de Site Survey</h2>

    <div class="table-responsive">
        <table id="surveysTable" class="table table-bordered table-striped display nowrap" style="width:100%">
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Nombre del Sitio</th>
                    <th>Dirección</th>
                    <th>Fecha</th>
                    <th>Observaciones</th>
                </tr>
                <tr>
                    <th><input type="text" placeholder="Buscar ID" class="form-control form-control-sm" /></th>
                    <th><input type="text" placeholder="Buscar Sitio" class="form-control form-control-sm" /></th>
                    <th><input type="text" placeholder="Buscar Dirección" class="form-control form-control-sm" /></th>
                    <th><input type="text" placeholder="Buscar Fecha" class="form-control form-control-sm" /></th>
                    <th><input type="text" placeholder="Buscar Observaciones" class="form-control form-control-sm" /></th>
                </tr>
            </thead>
            <tbody>
                @foreach($surveys as $survey)
                <tr>
                    <td>{{ $survey->id }}</td>
                    <td>{{ $survey->site_name }}</td>
                    <td>{{ $survey->address }}</td>
                    <td>{{ $survey->created_at->format('Y-m-d') }}</td>
                    <td>{{ $survey->observations }}</td>
                </tr>
                @endforeach
            </tbody>
        </table>
    </div>
</div>
@endsection

@section('scripts')
<!-- DataTables y Exportación -->
<link rel="stylesheet" href="https://cdn.datatables.net/1.13.6/css/jquery.dataTables.min.css">
<link rel="stylesheet" href="https://cdn.datatables.net/buttons/2.4.1/css/buttons.dataTables.min.css">

<script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
<script src="https://cdn.datatables.net/1.13.6/js/jquery.dataTables.min.js"></script>
<script src="https://cdn.datatables.net/buttons/2.4.1/js/dataTables.buttons.min.js"></script>
<script src="https://cdn.datatables.net/buttons/2.4.1/js/buttons.html5.min.js"></script>
<script src="https://cdn.datatables.net/buttons/2.4.1/js/buttons.print.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/jszip/3.10.1/jszip.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/pdfmake/0.2.7/pdfmake.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/pdfmake/0.2.7/vfs_fonts.js"></script>
<script src="//cdn.datatables.net/plug-ins/1.13.6/i18n/es-ES.json"></script>

<script>
    $(document).ready(function () {
        let table = $('#surveysTable').DataTable({
            dom: 'Bfrtip',
            responsive: true,
            language: {
                url: '//cdn.datatables.net/plug-ins/1.13.6/i18n/es-ES.json'
            },
            buttons: [
                {
                    extend: 'copyHtml5',
                    text: 'Copiar'
                },
                {
                    extend: 'excelHtml5',
                    text: 'Excel'
                },
                {
                    extend: 'csvHtml5',
                    text: 'CSV'
                },
                {
                    extend: 'pdfHtml5',
                    text: 'PDF'
                },
                {
                    extend: 'print',
                    text: 'Imprimir'
                }
            ],
            initComplete: function () {
                // Agrega filtrado por columna
                this.api().columns().every(function () {
                    var column = this;
                    $('input', column.header()).on('keyup change clear', function () {
                        if (column.search() !== this.value) {
                            column.search(this.value).draw();
                        }
                    });
                });
            }
        });
    });
</script>
@endsection
