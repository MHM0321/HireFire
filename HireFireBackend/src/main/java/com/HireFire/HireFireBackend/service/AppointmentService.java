package com.HireFire.HireFireBackend.service;

import com.HireFire.HireFireBackend.model.Appointment;
import com.HireFire.HireFireBackend.repository.AppointmentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class AppointmentService {

    @Autowired
    private AppointmentRepository appointmentRepository;

    public List<Appointment> getPendingAppointments(Long workerId) {
        return appointmentRepository.findByWorkerIdAndStatus(workerId, "PENDING");
    }

    public Appointment acceptAppointment(Long appointmentId) {
        Appointment appointment = appointmentRepository.findById(appointmentId).orElse(null);
        if (appointment != null) {
            appointment.setStatus("ACCEPTED");
            return appointmentRepository.save(appointment);
        }
        return null;
    }

    public Appointment rejectAppointment(Long appointmentId) {
        Appointment appointment = appointmentRepository.findById(appointmentId).orElse(null);
        if (appointment != null) {
            appointment.setStatus("REJECTED");
            return appointmentRepository.save(appointment);
        }
        return null;
    }
}