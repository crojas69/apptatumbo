@extends('layouts.app')

@section('content')
<div class="container">
    <h2>Registros de Site Survey</h2>
    <table id="surveyTable" class="table table-striped table-responsive">
        <thead>
            <tr>
                <th>ID</th>
                <th>Nombre del Sitio</th>
                <th>Dirección</th>
                <th>Condiciones Topográficas</th>
                <th>Foto Topografía</th>
                <th>Infraestructura</th>
                <th>Foto Infraestructura</th>
                <th>Ruido Electromagnético</th>
                <th>SNR</th>
                <th>Foto RF Survey</th>
                <th>Cableado / Última Milla</th>
                <th>Foto Cableado</th>
                <th>Ubicación Headend</th>
                <th>Foto Headend</th>
                <th>Ubicación Hogares</th>
                <th>Foto Hogares</th>
                <th>Firma</th>
            </tr>
        </thead>
        <tbody>
            @foreach($siteSurveys as $survey)
            <tr>
                <td>{{ $survey->id }}</td>
                <td>{{ $survey->site_name }}</td>
                <td>{{ $survey->address }}</td>
                <td>{{ $survey->topographic_conditions }}</td>
                <td><img src="{{ $survey->topography_photo }}" style="width: 100px;"></td>
                <td>{{ $survey->infrastructure }}</td>
                <td><img src="{{ $survey->infrastructure_photo }}" style="width: 100px;"></td>
                <td>{{ $survey->rf_noise }}</td>
                <td>{{ $survey->rf_snr }}</td>
                <td><img src="{{ $survey->rf_survey_photo }}" style="width: 100px;"></td>
                <td>{{ $survey->cable_last_mile }}</td>
                <td><img src="{{ $survey->cable_photo }}" style="width: 100px;"></td>
                <td>{{ $survey->headend_location }}</td>
                <td><img src="{{ $survey->headend_photo }}" style="width: 100px;"></td>
                <td>{{ $survey->homes_location }}</td>
                <td><img src="{{ $survey->homes_photo }}" style="width: 100px;"></td>
                <td><img src="{{ $survey->signature }}" style="width: 100px;"></td>
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
    });
</script>
@endsection
