<?php

namespace App\Http\Controllers\Api;

use App\Models\VisitApproval;
use Illuminate\Http\Request;

class VisitApprovalController extends Controller
{
    public function store(Request $request)
    {
        $data = $request->validate([
            'site_name' => 'required|string|max:255',
            'visit_date' => 'required|date',
            'rssi' => 'nullable|integer',
            'coverage_photo' => 'nullable|string|max:255',
            'connectivity_results' => 'nullable|string',
            'connectivity_photo' => 'nullable|string|max:255',
            'devices_tested' => 'nullable|integer',
            'devices_photo' => 'nullable|string|max:255',
            'web_access_results' => 'nullable|string',
            'web_access_photo' => 'nullable|string|max:255',
            'equipment_functionality' => 'nullable|string',
            'equipment_photo' => 'nullable|string|max:255',
            'equipment_list' => 'nullable|string',
            'equipment_list_photo' => 'nullable|string|max:255',
            'conclusion' => 'required|string',
            'signature' => 'nullable|string',
            'approved' => 'nullable|string',
        ]);

        VisitApproval::create($data);

        return response()->json(['success' => true]);
    }
}
