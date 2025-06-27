<?php

namespace App\Http\Controllers;

use App\Models\SiteSurvey;
use App\Models\VisitApproval;
use Illuminate\Http\Request;
use DB;

class DashboardController extends Controller
{
    public function index()
    {
        // Obtener todos los registros de site-surveys
        $surveys = SiteSurvey::all();

        // Obtener la cantidad de registros de site-surveys por mes
        $siteSurveyCounts = SiteSurvey::select(DB::raw('MONTH(created_at) as month'), DB::raw('COUNT(*) as count'))
            ->groupBy(DB::raw('MONTH(created_at)'))
            ->orderBy('month')
            ->get();

        $months = [];
        $counts = [];
        foreach ($siteSurveyCounts as $surveyCount) {
            $months[] = date('F', mktime(0, 0, 0, $surveyCount->month, 10));  // Nombre del mes
            $counts[] = $surveyCount->count;  // Contar los registros
        }

        // Obtener todos los registros de visit-approvals
        $visitApprovals = VisitApproval::all();

        // Obtener la cantidad de aprobaciones y no aprobaciones en visit-approval
        $approvalCounts = VisitApproval::select(DB::raw('approved'), DB::raw('COUNT(*) as count'))
            ->groupBy('approved')
            ->get();

        $labels = ['Aprobado', 'No Aprobado'];
        $data = [0, 0];
        foreach ($approvalCounts as $approvalCount) {
            if ($approvalCount->approved) {
                $data[0] = $approvalCount->count;  // Aprobado
            } else {
                $data[1] = $approvalCount->count;  // No Aprobado
            }
        }

        // Pasar los datos a la vista
        return view('dashboard', compact('surveys', 'visitApprovals', 'months', 'counts', 'labels', 'data'));
    }
}
