@extends('layouts.app')

@section('content')
<div class="container">
    <h2>Dashboard</h2>
    
    <!-- Gráfico de Site Survey -->
    <h3>Gráfico de Site Survey</h3>
    <canvas id="siteSurveyChart"></canvas>
    
    <!-- Gráfico de Visit Approval -->
    <h3>Gráfico de Visit Approval</h3>
    <canvas id="visitApprovalChart"></canvas>

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

        $('#visitApprovalTable').DataTable({
            dom: 'Bfrtip',
            buttons: ['excel', 'csv', 'print']
        });

        // Gráfico de Site Survey
        var siteSurveyData = {
            labels: @json($months),
            datasets: [{
                label: 'Cantidad de Site Surveys',
                data: @json($counts),
                borderColor: 'rgba(75, 192, 192, 1)',
                fill: false
            }]
        };

        var ctx1 = document.getElementById('siteSurveyChart').getContext('2d');
        new Chart(ctx1, {
            type: 'line',
            data: siteSurveyData
        });

        // Gráfico de Visit Approval
        var visitApprovalData = {
            labels: @json($labels),
            datasets: [{
                label: 'Cantidad de Visit Approvals',
                data: @json($data),
                backgroundColor: ['rgba(75, 192, 192, 0.2)', 'rgba(255, 99, 132, 0.2)'],
                borderColor: ['rgba(75, 192, 192, 1)', 'rgba(255, 99, 132, 1)'],
                borderWidth: 1
            }]
        };

        var ctx2 = document.getElementById('visitApprovalChart').getContext('2d');
        new Chart(ctx2, {
            type: 'pie',
            data: visitApprovalData
        });
    });
</script>
@endsection
