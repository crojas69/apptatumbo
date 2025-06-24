@extends('layouts.app')

@section('content')
<div class="container">
    <h2>Registros Site Survey</h2>
    <table id="surveyTable" class="table table-striped">
        <thead>
            <tr>
                <th>ID</th>
                <th>Usuario</th>
                <th>Sitio</th>
                <th>Fecha</th>
                <th>Equipo</th>
                <th>Objetivos</th>
                <th>Observaciones</th>
                <th>Formación</th>
                <th>Preventivo</th>
                <th>Correctivo</th>
                <th>BOM</th>
            </tr>
        </thead>
        <tbody>
            @foreach($surveys as $s)
            <tr>
                <td>{{ $s->id }}</td>
                <td>{{ $s->user->name ?? 'Sin asignar' }}</td>
                <td>{{ $s->site_name }}</td>
                <td>{{ $s->site_date }}</td>
                <td>{{ $s->team }}</td>
                <td>{{ $s->objetivos }}</td>
                <td>{{ $s->observaciones }}</td>
                <td>{{ $s->formacion }}</td>
                <td>{{ $s->mant_preventivo }}</td>
                <td>{{ $s->mant_correctivo }}</td>
                <td>{{ $s->bom_detalle }}</td>
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
        $('#surveyTable').DataTable({
            dom: 'Bfrtip',
            buttons: ['excel', 'csv', 'print']
        });

        $('#usersTable').DataTable({
            dom: 'Bfrtip',
            buttons: ['excel', 'csv', 'print']
        });
    });
</script>
@endsection
