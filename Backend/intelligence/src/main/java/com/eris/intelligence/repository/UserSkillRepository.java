package com.eris.intelligence.repository;

import com.eris.intelligence.entity.Skill;
import com.eris.intelligence.entity.User;
import com.eris.intelligence.entity.UserSkill;
import com.eris.intelligence.entity.ProficiencyLevel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface UserSkillRepository extends JpaRepository<UserSkill, Long> {

    // THE SMART FILTER: Yeh query us skill ke best employees ko unke experience aur projects ke hisaab se sort karke layegi
    @Query("SELECT us FROM UserSkill us WHERE us.skill.skillName = :skillName AND us.proficiencyLevel IN :levels ORDER BY us.projectsCompleted DESC, us.user.experienceYears DESC")
    List<UserSkill> findTopEmployeesForSkill(
            @Param("skillName") String skillName,
            @Param("levels") List<ProficiencyLevel> levels
    );

    Optional<UserSkill> findByUserAndSkill(User user, Skill skill);
}