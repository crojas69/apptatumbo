@extends('layouts.app')

@section('content')
<div class="container">
    <h2>Registros de Visit Approval</h2>
    <table id="visitApprovalTable" class="table table-striped table-responsive">
        <thead>
            <tr>
                <th>ID</th>
                <th>Nombre del Sitio</th>
                <th>Fecha de Visita</th>
                <th>RSSI</th>
                <th>Resultados Conectividad</th>
                <th>Conclusión</th>
                <th>Firma del Supervisor</th>
            </tr>
        </thead>
        <tbody>
            @foreach($visitApprovals as $v)
            <tr>
                <td>{{ $v->id }}</td>
                <td>{{ $v->site_name }}</td>
                <td>{{ $v->visit_date }}</td>
                <td>{{ $v->rssi }}</td>
                <td>{{ $v->connectivity_results }}</td>
                <td>{{ $v->conclusion }}</td>
                <td>
                    <img src="{{ $v->signature }}" alt="Firma" style="width: 100px;">
                </td>
            </tr>
            @endforeach
        </tbody>
    </table>
</div>
@endsection

@section('scripts')
<!-- DataTables + Export Buttons -->
<link rel="stylesheet" href="https://cdn.datatables.net/1.13.4/css/jquery.dataTables.min.css">
<link rel="stylesheet" href="https://cdn.datatables.net/buttons/2.3.6/css/buttons.dataTables.min.css">
<script src="https://code.jquery.com/jquery-3.7.0.min.js"></script>
<script src="https://cdn.datatables.net/1.13.4/js/jquery.dataTables.min.js"></script>
<script src="https://cdn.datatables.net/buttons/2.3.6/js/dataTables.buttons.min.js"></script>
<script src="https://cdn.datatables.net/buttons/2.3.6/js/buttons.html5.min.js"></script>
<script src="https://cdn.datatables.net/buttons/2.3.6/js/buttons.print.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/jszip/3.10.1/jszip.min.js"></script>

<script>
    $(document).ready(function () {
        $('#visitApprovalTable').DataTable({
            dom: 'Bfrtip',
            buttons: ['excel', 'csv', 'print']
        });
    });
</script>
@endsection
