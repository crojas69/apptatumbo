<?php

namespace App\Http\Controllers;

use App\Models\VisitApproval;
use Illuminate\Http\Request;

class VisitApprovalController extends Controller
{
    public function index()
    {
        // Obtener todos los registros de visit-approvals
        $visitApprovals = VisitApproval::all();
        return view('visit-approval', compact('visitApprovals'));
    }
}
