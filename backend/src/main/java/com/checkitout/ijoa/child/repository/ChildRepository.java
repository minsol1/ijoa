package com.checkitout.ijoa.child.repository;

import com.checkitout.ijoa.child.domain.Child;
import com.checkitout.ijoa.user.domain.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ChildRepository extends JpaRepository<Child, Long> {

    Long countByParentAndIsDeletedFalse(User parent);
}
